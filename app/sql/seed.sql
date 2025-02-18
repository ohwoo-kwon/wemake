-- jobs 테이블 (5행)
INSERT INTO jobs
(position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range)
VALUES
('Software Engineer', 'Develop and maintain software', 'Coding, code review', 'BS in CS', 'Health insurance', 'JavaScript, TypeScript', 'Tech Corp', 'logo1.png', 'New York', 'https://techcorp.com/apply', 'full-time', 'remote', '$250,000+'),
('Data Analyst', 'Analyze data', 'Data cleaning', 'BA in Statistics', 'Flexible hours', 'SQL, Python', 'Data Inc', 'logo2.png', 'San Francisco', 'https://datainc.com/apply', 'remote', 'hybrid', '$120,000 - $150,000'),
('Web Designer', 'Design websites', 'Create UI', 'Degree in Design', 'Travel allowances', 'Photoshop, Figma', 'Design Studio', 'logo3.png', 'Los Angeles', 'https://designstudio.com/apply', 'part-time', 'in-person', '$70,000 - $100,000'),
('Intern Developer', 'Assist dev team', 'Bug fixes', 'Enrolled in college', 'Stipend', 'HTML, CSS', 'Startup Hub', 'logo4.png', 'Boston', 'https://startuphub.com/apply', 'part-time', 'remote', '$0 - $50,000'),
('Project Manager', 'Manage projects', 'Team leadership', 'MBA', 'Bonus', 'Agile, Scrum', 'Business Solutions', 'logo5.png', 'Chicago', 'https://businesssolutions.com/apply', 'full-time', 'in-person', '$150,000 - $250,000');

-- follows 테이블 (5행; follower_id, following_id 모두 같은 값 사용)
INSERT INTO follows
(follower_id, following_id, created_at)
VALUES
('895fe975-9005-466a-b3de-5ebf41e12dc0', '895fe975-9005-466a-b3de-5ebf41e12dc0', now()),
('895fe975-9005-466a-b3de-5ebf41e12dc0', '895fe975-9005-466a-b3de-5ebf41e12dc0', now()),
('895fe975-9005-466a-b3de-5ebf41e12dc0', '895fe975-9005-466a-b3de-5ebf41e12dc0', now()),
('895fe975-9005-466a-b3de-5ebf41e12dc0', '895fe975-9005-466a-b3de-5ebf41e12dc0', now()),
('895fe975-9005-466a-b3de-5ebf41e12dc0', '895fe975-9005-466a-b3de-5ebf41e12dc0', now());

-- categories 테이블 (5행)
INSERT INTO categories
(name, description)
VALUES
('Tech', 'Technology related products'),
('Health', 'Healthcare and wellness products'),
('Finance', 'Financial services and products'),
('Education', 'Educational resources'),
('Entertainment', 'Entertainment and media products');

-- products 테이블 (5행)
INSERT INTO products
(name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id)
VALUES
('Product One', 'Innovate your world', 'Detailed description of product one', 'Uses AI technology', 'icon1.png', 'https://productone.example.com', '{"views":10, "reviews":2}', '895fe975-9005-466a-b3de-5ebf41e12dc0', 1),
('Product Two', 'Empower your business', 'Detailed description of product two', 'Automates workflows', 'icon2.png', 'https://producttwo.example.com', '{"views":20, "reviews":5}', '895fe975-9005-466a-b3de-5ebf41e12dc0', 2),
('Product Three', 'Transform your life', 'Detailed description of product three', 'Integrates with services', 'icon3.png', 'https://productthree.example.com', '{"views":15, "reviews":3}', '895fe975-9005-466a-b3de-5ebf41e12dc0', 3),
('Product Four', 'Experience excellence', 'Detailed description of product four', 'Cutting-edge features', 'icon4.png', 'https://productfour.example.com', '{"views":25, "reviews":7}', '895fe975-9005-466a-b3de-5ebf41e12dc0', 4),
('Product Five', 'Redefine possibilities', 'Detailed description of product five', 'User-friendly and robust', 'icon5.png', 'https://productfive.example.com', '{"views":30, "reviews":10}', '895fe975-9005-466a-b3de-5ebf41e12dc0', 5);

-- reviews 테이블 (5행)
INSERT INTO reviews
(product_id, profile_id, rating, review)
VALUES
(1, '895fe975-9005-466a-b3de-5ebf41e12dc0', 5, 'Great product!'),
(2, '895fe975-9005-466a-b3de-5ebf41e12dc0', 4, 'Very useful.'),
(3, '895fe975-9005-466a-b3de-5ebf41e12dc0', 3, 'Average quality.'),
(4, '895fe975-9005-466a-b3de-5ebf41e12dc0', 5, 'Exceeded expectations.'),
(5, '895fe975-9005-466a-b3de-5ebf41e12dc0', 2, 'Not as described.');

-- product_upvotes 테이블 (브릿지 - 복합 기본키: 1행)
INSERT INTO product_upvotes
(product_id, profile_id)
VALUES
(1, '895fe975-9005-466a-b3de-5ebf41e12dc0');

-- gpt_ideas 테이블 (5행)
INSERT INTO gpt_ideas
(idea, views, claimed_at, claimed_by)
VALUES
('Build a chatbot', 100, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Create a recommendation engine', 50, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Develop an analytics tool', 75, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Launch a social media platform', 200, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Start an e-commerce store', 150, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0');

-- gpt_ideas_likes 테이블 (브릿지 - 복합 기본키: 1행)
INSERT INTO gpt_ideas_likes
(gpt_idea_id, profile_id)
VALUES
(1, '895fe975-9005-466a-b3de-5ebf41e12dc0');

-- topics 테이블 (5행)
INSERT INTO topics
(name, slug)
VALUES
('Technology', 'technology'),
('Science', 'science'),
('Art', 'art'),
('History', 'history'),
('Travel', 'travel');

-- posts 테이블 (5행)
INSERT INTO posts
(title, content, topic_id, profile_id)
VALUES
('Post One', 'Content of post one', 1, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Post Two', 'Content of post two', 2, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Post Three', 'Content of post three', 3, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Post Four', 'Content of post four', 4, '895fe975-9005-466a-b3de-5ebf41e12dc0'),
('Post Five', 'Content of post five', 5, '895fe975-9005-466a-b3de-5ebf41e12dc0');

-- post_replies 테이블 (5행; parent_id는 NULL로 처리)
INSERT INTO post_replies
(post_id, parent_id, profile_id, reply)
VALUES
(1, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Reply to post one'),
(2, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Reply to post two'),
(3, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Reply to post three'),
(4, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Reply to post four'),
(5, NULL, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Reply to post five');

-- post_upvotes 테이블 (브릿지 - 복합 기본키: 1행)
INSERT INTO post_upvotes
(post_id, profile_id)
VALUES
(1, '895fe975-9005-466a-b3de-5ebf41e12dc0');

-- teams 테이블 (5행)
INSERT INTO teams
(product_name, team_size, equity_split, product_stage, roles, product_description)
VALUES
('Team Alpha', 5, 50, 'idea', 'developer, designer', 'Innovative product idea.'),
('Team Beta', 10, 60, 'prototype', 'marketer, product-manager', 'Prototype phase product.'),
('Team Gamma', 7, 40, 'product', 'developer, marketer', 'Development stage with strong growth.'),
('Team Delta', 8, 55, 'mvp', 'designer, product-manager', 'MVP ready for launch.'),
('Team Epsilon', 6, 45, 'mvp', 'founder, developer', 'Launched product making waves.');

-- message_rooms 테이블 (5행)
INSERT INTO message_rooms
(created_at)
VALUES
(now()), (now()), (now()), (now()), (now());

-- message_room_members 테이블 (브릿지 - 복합 기본키: 1행)
INSERT INTO message_room_members
(message_room_id, profile_id)
VALUES
(1, '895fe975-9005-466a-b3de-5ebf41e12dc0');

-- messages 테이블 (5행)
INSERT INTO messages
(message_room_id, sender_id, content)
VALUES
(1, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Hello from room 1'),
(2, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Hello from room 2'),
(3, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Hello from room 3'),
(4, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Hello from room 4'),
(5, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'Hello from room 5');

-- notifications 테이블 (5행)
INSERT INTO notifications
(source_id, product_id, post_id, target_id, type)
VALUES
('895fe975-9005-466a-b3de-5ebf41e12dc0', 1, 1, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'follow'),
('895fe975-9005-466a-b3de-5ebf41e12dc0', 2, 2, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'review'),
('895fe975-9005-466a-b3de-5ebf41e12dc0', 3, 3, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'reply'),
('895fe975-9005-466a-b3de-5ebf41e12dc0', 4, 4, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'mention'),
('895fe975-9005-466a-b3de-5ebf41e12dc0', 5, 5, '895fe975-9005-466a-b3de-5ebf41e12dc0', 'follow');