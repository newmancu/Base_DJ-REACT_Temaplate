from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.utils.regex_helper import _lazy_re_compile
from django.db import models

# VALIDATORS
color_validator = RegexValidator(
    _lazy_re_compile(r"^#(([0-9abcdef]{3,4})|([0-9abcdef]{6})|([0-9abcdef]{8}))\Z"),
    message=_("Enter a valid hue."),
    code="invalid",
)

def validate_color(value):
  return color_validator(value)


# FIELDS
class ColorField(models.CharField):

  def __init__(self, *args, **kwargs):
    kwargs['max_length'] = 9
    super().__init__(*args, **kwargs)
    self.validators.append(validate_color)


# MODELS
class TodoTask(models.Model):
  task_text = models.CharField(
    _('task_text'),
    max_length=256
  )

  create_date = models.DateTimeField(
    _('task created date'),
    auto_now=True
  )

  end_date = models.DateTimeField(
    _('task end date'),
    blank=True,
    null=True
  )

  finished_date = models.DateTimeField(
    _('task finished date'),
    blank=True,
    null=True
  )

  todo_box = models.ForeignKey(
    'TodoBox',
    on_delete=models.CASCADE,
    related_name='boxes'
  )

  def __str__(self) -> str:
    return f"{self.todo_box} - {self.task_text if len(self.task_text) <= 10 else self.task_text[:10] + '...'}"

  def __repr__(self) -> str:
    return self.__str__()


class TodoBox(models.Model):
  author = models.ForeignKey(
    'auth.User',
    on_delete=models.DO_NOTHING,
    related_name='authors'
  )

  box_name = models.CharField(
    _('box name'),
    max_length=128
  )

  color = ColorField(
    verbose_name=_('box color')
  )

  def __str__(self) -> str:
    return f"{self.author.username} - {self.box_name}"

  def __repr__(self) -> str:
    return self.__str__()


class TodoTaskBox(models.Model):
  
  task_id = models.BigIntegerField(
    'task_id',
    primary_key=True
  )

  todo_box = models.ForeignKey(
    'TodoBox',
    on_delete=models.CASCADE,
    related_name='tt_tb_boxes',
    db_column='box_id'
  )

  task_text = models.CharField(
    _('task_text'),
    max_length=256
  )

  create_date = models.DateTimeField(
    _('task created date'),
    auto_now=True
  )

  end_date = models.DateTimeField(
    _('task end date'),
    blank=True,
    null=True
  )

  finished_date = models.DateTimeField(
    _('task finished date'),
    blank=True,
    null=True
  )
  
  box_name = models.CharField(
    _('box name'),
    max_length=128
  )

  color = ColorField(
    verbose_name=_('box color')
  )

  author = models.ForeignKey(
    'auth.User',
    on_delete=models.DO_NOTHING,
    related_name='tt_tb_authors'
  )

  def __str__(self) -> str:
    return f"{self.todo_box}"

  def __repr__(self) -> str:
    return self.__str__()
    

  class Meta:
    db_table = 'back_api_task_and_box'
    managed = False
    ordering = ['end_date', 'create_date']