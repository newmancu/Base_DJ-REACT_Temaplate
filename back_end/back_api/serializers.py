from pyrsistent import field
from rest_framework.serializers import ModelSerializer
from back_api.models import TodoBox, TodoTask, TodoTaskBox


class BoxSerializer(ModelSerializer):

  class Meta:
    model = TodoBox
    fields = '__all__'


class TaskSerializer(ModelSerializer):

  class Meta:
    model = TodoTask
    fields = '__all__'
    extra_kwargs = {
      'create_date' : {
        'read_only_field': True
      }
    }


class TaskBoxSerializer(ModelSerializer):

  class Meta:
    model = TodoTaskBox
    fields = '__all__'