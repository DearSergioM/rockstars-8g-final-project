# Generated by Django 4.0.4 on 2022-05-11 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0002_category_order_singer_song_shippingaddress_review_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]