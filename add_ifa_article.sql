-- Insert IFA Conference article with content and images
INSERT INTO public.articles (
  title,
  slug,
  category,
  excerpt,
  content,
  author,
  date,
  read_time,
  source,
  featured_image,
  images
) VALUES (
  'Insights from the International Federation on Ageing Global Conference in Cape Town',
  'ifa-global-conference-cape-town-2025',
  'International Conferences',
  'Mrs. Margaret Njagi, Director of Charis Eagle Springs, shares insights from the IFA Global Conference in Cape Town focused on shaping an inclusive, healthy, and empowered future for all generations.',
  'The International Federation on Ageing (IFA) Global Conference, held in Cape Town, South Africa, was an inspiring global gathering that was attended by leaders, advocates, and policymakers dedicated to advancing the well-being, inclusion, and rights of older persons worldwide.

Mrs. Margaret Njagi, Director of Charis Eagle Springs and Deputy Chair of the CommonAge Kenya Chapter, had the privilege of attending the four-day conference, from 9th September 2025 to 12th September 2025 which was filled with deep learning, meaningful dialogue, and impactful networking.

The event was characterized by masterclasses and plenary sessions focused on critical topics such as Age-Friendly Cities and Communities, Technology and Ageing, Immunisation, and the Future of Healthy Longevity. Each session was designed to exchange knowledge and inspire collective action toward building a world where older persons are valued, included, and supported to thrive.

Throughout the conference, participants were challenged and inspired to reimagine how societies could better respond to the realities of ageing — not as a burden, but as an opportunity to create stronger, more inclusive communities.

Mrs. Njagi was grateful to have engaged with global leaders and delegates from various countries who are at the forefront of policy, research, and practice in ageing. The conference experience was marked as both enriching and transformative, having reinforced the importance of collaboration and innovation in promoting healthy and dignified ageing for all.

The IFA Global Conference in Cape Town was recognized as a platform that strengthened global partnerships, amplified African voices, and celebrated the progress made in the ageing agenda across continents.

As Mrs. Njagi reflected, the experience was a powerful reminder that the future of ageing is a shared responsibility — one that must be shaped to be inclusive, healthy, and empowering for all generations.',
  'Mrs. Margaret Njagi',
  '2025-09-12',
  '5 min read',
  'Charis Eagle Springs',
  '/IFA Conference Capetown/755b1307-289e-4d44-bd26-df709ea90f7e.jpg',
  ARRAY[
    '/IFA Conference Capetown/f9970a2d-2104-4129-a6c9-caf6559365e3.jpg',
    '/IFA Conference Capetown/d93b201b-eb48-440b-b6a1-655ed7cdc7ea.jpg',
    '/IFA Conference Capetown/7cf91e4b-3d28-4adf-908a-5301d6de3a6e.jpg',
    '/IFA Conference Capetown/755b1307-289e-4d44-bd26-df709ea90f7e.jpg',
    '/IFA Conference Capetown/16988c27-6df0-4c6b-8736-678872449728.jpg',
    '/IFA Conference Capetown/ecc942b2-63b1-41ca-9809-0b5aa14b507e.jpg',
    '/IFA Conference Capetown/2a0f53e1-20d7-418d-8cda-f4bcc7cfcdd8.jpg',
    '/IFA Conference Capetown/dda5b5e2-97ac-49bf-9458-b23cc2eab377.jpg',
    '/IFA Conference Capetown/1f895156-b26f-4dd7-a60a-1ba803c82625.jpg',
    '/IFA Conference Capetown/7597fa09-2abb-47c7-9e45-c100a26cff14.jpg'
  ]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author = EXCLUDED.author,
  date = EXCLUDED.date,
  read_time = EXCLUDED.read_time,
  source = EXCLUDED.source,
  featured_image = EXCLUDED.featured_image,
  images = EXCLUDED.images,
  updated_at = now();



