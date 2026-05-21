import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localBusiness',
  title: 'Local Business JSON-LD configurations',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Business name', type: 'string' }),
    defineField({ name: 'legalName', title: 'Corporate Name registration', type: 'string' }),
    defineField({ name: 'logo', title: 'Company logo URL', type: 'string' }),
    defineField({ name: 'telephone', title: 'Customer hotline', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Physical Location',
      type: 'object',
      fields: [
        defineField({ name: 'streetAddress', title: 'Street info', type: 'string' }),
        defineField({ name: 'addressLocality', title: 'Locality/City', type: 'string' }),
        defineField({ name: 'addressRegion', title: 'Province', type: 'string' }),
        defineField({ name: 'postalCode', title: 'ZIP', type: 'string' }),
        defineField({ name: 'addressCountry', title: 'Country code (e.g., VN)', type: 'string' })
      ]
    }),
    defineField({
      name: 'geo',
      title: 'Geographical Coordinates',
      type: 'object',
      fields: [
        defineField({ name: 'latitude', title: 'Latitude numeric value', type: 'number' }),
        defineField({ name: 'longitude', title: 'Longitude', type: 'number' })
      ]
    }),
    defineField({ name: 'priceRange', title: 'Cost range indicator (e.g. $$-$$$)', type: 'string' }),
    defineField({
      name: 'openingHoursSpecification',
      title: 'Timetable schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'openingHoursItem',
          title: 'Opening Hours Specification',
          fields: [
            defineField({ name: 'dayOfWeek', title: 'Days', type: 'string' }),
            defineField({ name: 'opens', title: 'Time starts', type: 'string' }),
            defineField({ name: 'closes', title: 'Closing', type: 'string' })
          ]
        }
      ]
    })
  ]
});
