from django.urls import path, include
from rest_framework.routers import DefaultRouter
from back_api.views import TaskViewSet, BoxViewSet, user_register, taskbox_list

router = DefaultRouter()
router.register('task', TaskViewSet, basename='task')
router.register('box', BoxViewSet, basename='box')


urlpatterns = [
    path('', include(router.urls)),
    path('user/register', user_register),
    path('taskbox', taskbox_list)
]
