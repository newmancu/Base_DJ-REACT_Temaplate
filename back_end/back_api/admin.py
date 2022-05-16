from django.contrib import admin
from back_api.models import TodoBox, TodoTask


@admin.register(TodoTask)
class TaskAdmin(admin.ModelAdmin):
  pass

@admin.register(TodoBox)
class BoxAdmin(admin.ModelAdmin):
  pass


