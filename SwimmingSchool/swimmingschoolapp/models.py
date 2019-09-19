from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Notification(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='notifications', on_delete=models.CASCADE, default='')

    class Meta:
        db_table = 'Notification'
        verbose_name = 'Obavijest'
        verbose_name_plural = 'Obavijesti'


class SwimmingGroup(models.Model):
    year = models.IntegerField()
    name = models.CharField(max_length=32, unique=True)

    class Meta:
        db_table = 'Group'
        verbose_name = 'Grupa'
        verbose_name_plural = 'Grupe'


class Swimmer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    born = models.DateField()
    group = models.ForeignKey(SwimmingGroup, related_name='swimmers', on_delete=models.CASCADE)
    parent = models.ForeignKey(User, related_name='swimmer', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Swimmer'
        verbose_name = 'Plivač'
        verbose_name_plural = 'Plivači'


class Training(models.Model):
    date_held = models.DateTimeField(auto_now_add=True)
    trained_by = models.ManyToManyField(User, symmetrical=False, through='TrainingTrainer')

    class Meta:
        db_table = 'Training'
        verbose_name = 'Trening'
        verbose_name_plural = 'Treninzi'


# many to many tablica jer na vise trenera moze biti na jednom treningu i mogu imati vise treninga
class TrainingTrainer(models.Model):
    training = models.ForeignKey(Training, on_delete=models.CASCADE)
    trainer = models.ForeignKey(User, related_name='trainings', on_delete=models.CASCADE)

    class Meta:
        db_table = 'TrainingTrainer'
        verbose_name = 'TreningTrener'
        verbose_name_plural = 'TreninziTrener'


class TrainingSwimmer(models.Model):
    swimmer = models.ForeignKey(Swimmer, on_delete=models.CASCADE)
    training = models.ForeignKey(Training, on_delete=models.CASCADE)
    group = models.ForeignKey(SwimmingGroup, on_delete=models.CASCADE)
    presence = models.BooleanField()

    class Meta:
        db_table = 'TrainingSwimmer'
        verbose_name = 'TreningPlivač'
        verbose_name_plural = 'TreninziPlivač'