from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Album

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'