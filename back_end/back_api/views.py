from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from back_api.serializers import *


# PERMISSIONS
class IsCurUser_Box(IsAuthenticated):

  def has_permission(self, request, view):
    data = request.data
    return super().has_permission(request, view) \
      and data.get('author') == request.user.pk


class IsCurUser_Task(IsAuthenticated):

  def has_permission(self, request, view):
    data = request.data
    if not data.get('todo_box'):
      return False
    box = TodoBox.objects.get(pk=data.get('todo_box'))
    if not box:
      return False
    author = box.author
    return super().has_permission(request, view) \
      and author == request.user.pk


# VIEWS

class TaskViewSet(ModelViewSet):

  queryset = TodoTask.objects.all()
  serializer_class = TaskSerializer


  def get_permissions(self):
    if self.action in ['list', 'retrive', 'destroy']:
      pc = [IsAuthenticated]
    else:
      pc = [IsAdminUser | IsCurUser_Task]
    return [p() for p in pc]

  def perform_create(self, serializer):
    return super().perform_create(serializer)

  def perform_update(self, serializer):
    return super().perform_update(serializer)

  # def destroy(self, request, *args, **kwargs):

  #   instance = self.get_object()
  #   if request.user.is_staff or request.user == instance.author:
  #     self.perform_destroy(instance)
  #     return Response(status=status.HTTP_204_NO_CONTENT)

  #   return Response(status=status.HTTP_400_BAD_REQUEST)

  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)  

  def list(self, request, *args, **kwargs):

    queryset = self.get_queryset()
    if request.user.is_staff:
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      queryset = queryset.filter(author=request.user.pk)
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

class BoxViewSet(ModelViewSet):

  queryset = TodoBox.objects.all()
  serializer_class = BoxSerializer


  def destroy(self, request, *args, **kwargs):

    instance = self.get_object()
    print(instance.author, request.user)
    if request.user.is_staff or request.user == instance.author:
      self.perform_destroy(instance)
      return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)

  def get_permissions(self):
    if self.action in ['list', 'retrive', 'destroy']:
      pc = [IsAuthenticated]
    else:
      pc = [IsAdminUser | IsCurUser_Box]
    return [p() for p in pc]

  def list(self, request, *args, **kwargs):

    queryset = self.get_queryset()
    if request.user.is_staff:
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      queryset = queryset.filter(author=request.user.pk)
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def user_register(request):
  if request.data.get('username') and request.data.get('password1') and request.data.get('password2'):
    if request.data.get('password1') == request.data.get('password2'):
      User.objects.create_user(
        username=request.data.get('username'),
        password=request.data.get('password1'))
      return Response(status=status.HTTP_201_CREATED)
  return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def taskbox_list(request):
  queryset = TodoTaskBox.objects.filter(author=request.user.pk).exclude(finished_date__isnull=False)
  s = TaskBoxSerializer(queryset, many=True)
  return Response(s.data, status=status.HTTP_200_OK)