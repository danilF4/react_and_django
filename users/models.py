from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from rest_framework.authtoken.models import Token
from items.models import Item, OrderItem

class UserManager(BaseUserManager):
	def create_user(self, email, password=None, is_staff=False, is_admin=False, is_active=False):
		if not email:
			raise ValueError("User must have an email")
		if not password:
			raise ValueError("User msut have an password")
		user = self.model(
			email= self.normalize_email(email)
			)
		user.staff  	= is_staff
		user.admin 		= is_admin
		user.active 	= is_active
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_staffuser(self, email, password=None):
		user = self.create_user(
			email,
			password=password,
			is_staff=True
			)
		return user

	def create_superuser(self, email, password=None):
		user = self.create_user(
			email,
			password=password,
			is_staff=True,
			is_admin=True,
			is_active=True,
			)
		return user

class MyUser(AbstractBaseUser):
	email 		= models.EmailField(max_length=255, unique=True)
	username 	= models.CharField(max_length=50, blank=True)
	added_items = models.ManyToManyField(OrderItem, blank=True)
	active		= models.BooleanField(default=True)
	staff 		= models.BooleanField(default=False)
	admin 		= models.BooleanField(default=False)

	USERNAME_FIELD = 'email'
	#REQUIRED_FIELDS = ['']
	objects = UserManager()

	def __str__(self):
		return self.email

	def has_perms(self, perm, obj=None):
		return True

	def has_perm(self, perm, obj=None):
		return True

	def has_module_perms(self, app_label):
		return True

	@property
	def is_staff(self):
		return self.staff

	@property
	def is_admin(self):
		return self.admin

	@property
	def is_active(self):
		return self.active


class UserProfile(models.Model):
	user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
	#liked_items	= models.ManyToManyField(Items, related_name='liked_items', blank=True)
	image = models.ImageField(upload_to='users/profile_images', blank=True)
	
	def __str__(self):
		return str(self.user)

def user_created_receiver(sender, instance, created, *args, **kwargs):
	if created and instance.email:
		UserProfile.objects.get_or_create(user=instance)

post_save.connect(user_created_receiver, sender=MyUser)
