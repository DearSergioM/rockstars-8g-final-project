from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Album
from .albums import albums
from .serializers import AlbumSerializer
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response("Hello")

@api_view(['GET'])
def getAlbums(request):
    albums = Album.objects.all()
    serializer = AlbumSerializer(albums, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAlbum(request, pk):
    album = Album.objects.get(_id=pk)
    serializer = AlbumSerializer(album, many=False)
    return Response(serializer.data)
