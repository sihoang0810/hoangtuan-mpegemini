import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO Metrics (Tối ưu từ khoá / Metadata)',
  type: 'document',
  fields: [
    defineField({ name: 'pagePath', title: 'Target page relative slug (e.g. /, /san-pham)', type: 'string' }),
    defineField({ name: 'metaTitle', title: 'Browser Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta description', type: 'text' }),
    defineField({ name: 'canonicalUrl', title: 'Conforming URL standard', type: 'string' }),
    defineField({ name: 'ogImage', title: 'Open Graph Image thumbnail URL', type: 'string' }),
    defineField({ name: 'keywords', title: 'Index target terms', type: 'array', of: [{ type: 'string' }] })
  ]
});
