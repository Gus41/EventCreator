from rest_framework import serializers
from .models import Event,Session




class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Event
        fields = '__all__'
        
        def create(self, validated_data):
            sessions_data = validated_data.pop('sessions')
            post = Event.objects.create(**validated_data)
            for session_data in sessions_data:
                Session.objects.create(post=post, **session_data)
            return post
    sessions = SessionSerializer(many=True, read_only=True)
    