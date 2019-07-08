from django.urls import path, include
from .views import ListItemView, DetailItemView, UpdateItemView, CreateItemView, SizeView, EmptyListView, CategoryView
from .order_views import ListOrderView, DetailOrderView, CreateOrderView, UpdateOrderView
#from .order_item_views import ListOrderItemView, DetailOrderItemView, CreateOrderItemView, UpdateOrderItemView
#from rest_framework.routers import DefaultRouter

urlpatterns = [
	# Item API Views
	path('sizes/', SizeView.as_view()),
	path('categories/', CategoryView.as_view()),

	path('empty/', EmptyListView.as_view()),

	path('create/', CreateItemView.as_view()),
	path('', ListItemView.as_view()),
	path('<pk>/', DetailItemView.as_view()),
	path('update/<pk>/', UpdateItemView.as_view()),
]