from django.db import models

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.TextField()

    def __str__(self) -> str:
        return self.title
    
class Session(models.Model):
    post = models.ForeignKey(Event, related_name='sessions', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self) -> str:
        return self.title
    
