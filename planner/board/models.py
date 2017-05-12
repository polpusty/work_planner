from django.db import models

from authentication.models import User


class Board(models.Model):
    name = models.CharField(max_length=64)
    user = models.ManyToManyField(User, through='BoardUser')
    archived = models.BooleanField(default=False)

    def __str__(self):
        return "Id: %s %s - Board" % (self.id, self.name)


class Column(models.Model):
    name = models.CharField(max_length=64)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    archived = models.BooleanField(default=False)

    def __str__(self):
        return "Id: %s %s Board: %s  - Column" % (self.id, self.name, self.board.name)


class Note(models.Model):
    text = models.TextField()
    column = models.ForeignKey(Column, on_delete=models.CASCADE)
    archived = models.BooleanField(default=False)

    def __str__(self):
        return "Id: %s %s Column: %s Board: %s - Note" % (self.id, self.text[:30], self.column.name, self.column.board.name)


class BoardUser(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_admin = models.BooleanField()

    def __str__(self):
        return "Id: %s User: %s Board: %s - BoardUser" % (self.id, self.user.username, self.board.name)
