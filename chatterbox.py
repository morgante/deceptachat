import hashlib
import gevent
import json
import redis
import os

class Chatterbox(object):
    def __init__(self, secret, redis_uri="redis://localhost:6379"):
        if secret is None:
            raise ValueError("Secret required")
        print "secret", secret, redis_uri
        self.redis = redis.from_url(redis_uri)
        self.secret = secret

    def __hash_username(self, name):
        return hashlib.sha256(name + self.secret).hexdigest()

    def __get_redis_list(self, name):
        return "chatbox_inbox_" + self.__hash_username(name)

    def __get_redis_channel(self, name):
        return "chatbox_channel_" + self.__hash_username(name)

    def register_user(self, name):
        hashed = self.__hash_username(name)

        print "hash", hashed

        addable = self.redis.sadd("chatbox_users", name)

        print "added", addable

        if (addable):
            return hashed
        else:
            return False

    def authenticate(self, username):
        return True

    def __grab_recent(self, username, count=100):
        return self.redis.lrange(self.__get_redis_list(username), -1 * count, -1)

    def open_inbox(self, username, handler):
        if True:
            def send(data):
                if (data is not None):
                    info = json.loads(data)
                    self.send_message(username, info.get("to"), info.get("contents"), info.get("id"))

            def receiver(data):
                info = json.loads(data.get("data"))
                if (info.get("from") != username):
                    handler(data.get("data"))

            for message in self.__grab_recent(username):
                info = json.loads(message)
                if (info.get("to") != "group"):
                    handler(message)

            for message in self.__grab_recent("group"):
                handler(message)

            pubsub = self.redis.pubsub()
            pubsub.subscribe(**{
                "" + self.__get_redis_channel(username): receiver,
                "" + self.__get_redis_channel("group"): receiver
            })
            pubsub.run_in_thread(sleep_time=0.001)

            return send
        else:
            return False

    def send_message(self, sender, destination, contents, uuid):
        data = json.dumps({
            "from": sender,
            "to": destination,
            "contents": contents,
            "id": uuid
        })

        self.redis.rpush(self.__get_redis_list(destination), data)
        self.redis.rpush(self.__get_redis_list(sender), data)
        self.redis.publish(self.__get_redis_channel(destination), data)
