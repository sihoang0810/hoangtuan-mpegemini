import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Vật tư & Thiết bị (Product)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên Sản Phẩm / Vật Tư',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Giá bán / Giá thay thế tham khảo',
      type: 'string',
      description: 'Ví dụ: 120.000đ hoặc Liên hệ nhận báo giá',
    }),
    defineField({
      name: 'specs',
      title: 'Thông số kỹ thuật / Mô tả ngắn',
      type: 'text',
      description: 'Ví dụ: Thương hiệu MPE, chống cháy nổ, bảo hành 2 năm...',
    }),
    defineField({
      name: 'productImage',
      title: 'Ảnh chụp sản phẩm (Product Image)',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Hiển thị cho Chi Nhánh',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hồ Chí Minh', value: 'ho-chi-minh' },
          { title: 'Bảo Lộc', value: 'bao-loc' }
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      initialValue: 0,
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'productImage'
    }
  }
});
