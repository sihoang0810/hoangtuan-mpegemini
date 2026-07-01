import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Cấu hình Website & Chi Nhánh (Site Settings)',
  type: 'document',
  fields: [
    defineField({
      name: 'branchName',
      title: 'Tên Chi Nhánh / Tên Công Ty',
      type: 'string',
      description: 'Ví dụ: Hoàng Tuấn MPE - Chi nhánh TP.HCM',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locationSlug',
      title: 'Khu vực / Chi nhánh',
      description: 'Chọn chi nhánh tương ứng. React sẽ dựa vào đây để tải cấu hình phù hợp với URL người dùng đang xem.',
      type: 'string',
      options: {
        list: [
          { title: 'Hồ Chí Minh (ho-chi-minh)', value: 'ho-chi-minh' },
          { title: 'Bảo Lộc (bao-loc)', value: 'bao-loc' }
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Thương Hiệu (Website Logo)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'hotline',
      title: 'Số điện thoại Hotline',
      type: 'string',
      initialValue: '0389 011 315',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'zaloNumber',
      title: 'Số Zalo liên hệ',
      type: 'string',
      description: 'Nhập số điện thoại đăng ký Zalo để kích hoạt nút nhắn tin nhanh.',
    }),
    defineField({
      name: 'email',
      title: 'Địa chỉ Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Địa chỉ văn phòng / nhà xưởng',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'workingHours',
      title: 'Thời gian làm việc',
      type: 'string',
      initialValue: 'Hoạt động 24/7 (Cả ngày lễ & Chủ nhật)',
    }),
    defineField({
      name: 'headerPromoText',
      title: 'Dòng thông báo chạy nổi (Header Notification Banner)',
      type: 'string',
      initialValue: '💥 Khảo sát 0đ & Rà quét siêu âm đường ống rò rỉ ngay hôm nay!',
    }),
    
    // SEO & Social Fields
    defineField({
      name: 'seoTitle',
      title: 'Tiêu đề SEO mặc định (SEO Meta Title)',
      type: 'string',
      description: 'Hiển thị trên tab trình duyệt và kết quả tìm kiếm Google.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Mô tả SEO mặc định (SEO Meta Description)',
      type: 'text',
      description: 'Mô tả ngắn gọn về dịch vụ rò rỉ nước & sửa điện nước.',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Từ khóa tìm kiếm (Keywords)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Thêm các từ khóa như: do tim ro ri nuoc, sua dien nuoc...',
    }),
    defineField({
      name: 'metaShareImage',
      title: 'Ảnh chia sẻ mạng xã hội (OpenGraph Image)',
      type: 'image',
      description: 'Hình ảnh hiển thị khi gửi link website qua Zalo, Facebook.',
    })
  ],
  preview: {
    select: {
      title: 'branchName',
      subtitle: 'locationSlug',
      media: 'logo'
    }
  }
});
