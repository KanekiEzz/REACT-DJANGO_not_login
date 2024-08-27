from django.urls import path
from .views import get_books, create_book, delete_book,update_book_title

urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/create/', create_book, name='create_book'),
    path('books/<int:pk>/', delete_book, name='delete_book'),
    path('books/<int:pk>/update/', update_book_title, name='update_book_title'),
]
