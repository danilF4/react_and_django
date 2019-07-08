from django.db import models

from django.conf import settings

CATEGORY_CHOICES = (
	('T-Shirt', 'T-Shirt'),
	('Hoodies', 'Hoodies'),
	('Hats', 'Hats')
)

SIZE_CHOICES = (
	('S', 'S(48)'),
	('M', 'M(50)'),
	('L', 'L(52)'),
	('X', 'X(54)')
)

# Create your models here.
class Category(models.Model):
	category = models.CharField(max_length=50)

	def __str__(self):
		return self.category

class Size(models.Model):
	size = models.CharField(max_length=5)

	def __str__(self):
		return self.size

class Item(models.Model):
	title = models.CharField(max_length=50)
	price = models.FloatField(default=0)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	image = models.ImageField(upload_to='items/images') # the each image should be 500*500

	def __str__(self):
		return self.title

class OrderItem(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	item_image = models.CharField(max_length=400, blank=True)
	item_title = models.CharField(max_length=50, blank=True)
	item_price = models.FloatField(default=0, blank=True)
	item_size = models.CharField(max_length=5, blank=True)
	item_category = models.CharField(max_length=50, blank=True)
	item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='items')
	size = models.ForeignKey(Size, on_delete=models.CASCADE)
	quantity = models.IntegerField(default=1)

	def __str__(self):
		return self.item.title + " | size: " + self.size.size + " | user: " + self.user.email


class Order(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	items = models.ManyToManyField(OrderItem, related_name='order_items')
	start_date = models.DateTimeField(auto_now_add = True)
	ordered_date = models.DateTimeField(auto_now_add = True)
	ordered = models.BooleanField(default=False)

	def __str__(self):
		return self.user.email

class Empty_class(models.Model):
	#user2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	#item2 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='order_item2')
	#size2 = models.ForeignKey(Size, on_delete=models.CASCADE)
	quantity2 = models.IntegerField(default=1)

	def __str__(self):
		return self.quantity2