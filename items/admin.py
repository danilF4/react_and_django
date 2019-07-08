from django.contrib import admin
from .models import Item, Order, OrderItem, Category, Size
# Register your models here.
admin.site.register(Category)
admin.site.register(Size)
admin.site.register(Item)
admin.site.register(OrderItem)
admin.site.register(Order)