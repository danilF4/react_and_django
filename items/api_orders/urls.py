from django.urls import path
from .views import OrderViewSet#, DetailOrderView, CreateOrderView, UpdateOrderView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', OrderViewSet, base_name='articles')
urlpatterns = router.urls
'''
urlpatterns = [
	path('update/<pk>/', UpdateOrderView.as_view()),
	path('create/', CreateOrderView.as_view()),
	path('<pk>/', DetailOrderView.as_view()),
	path('', ListOrderView.as_view()),
]'''