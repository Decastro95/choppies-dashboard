-- =========================================
-- supabase/seeds.sql
-- =========================================

-- Reset schema
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- ======================
-- TABLES
-- ======================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    phone TEXT,
    email TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    expiration_days INT,
    damage_status TEXT
);

-- ======================
-- SEED ROLES
-- ======================
INSERT INTO roles (name) VALUES 
('Admin'), ('Manager'), ('Cashier')
ON CONFLICT (name) DO NOTHING;

-- ======================
-- SEED SHOPS
-- ======================
INSERT INTO shops (name, location, phone, email) VALUES
('Choppies Omuthiya','Shop No:5, Omuthiya Shopping Centre, Erf 77, Main Street, Omuthiya','264814000000','omuthiya@choppies.co.na'),
('Choppies Rosh Pinah','Shop 1, Rosh Pinah Shopping Centre, 174 Lood street, Rosh Pinah','264815000000','roshpinah@choppies.co.na'),
('Choppies Delhi','64 Bonn street,Otjiomuise,Windhoek','264819000000','delhi@choppies.co.na'),
('Choppies DC Windhoek','ERF 490PS ,10 Platinum Street, Prosperita ,Windhoek','264833000000','dcwindhoek@choppies.co.na'),
('Choppies Khomasdal','Shop No: 9 , Ground Floor, Khomas Groove Mall, Khomasdal, Windhoek','264814000001','khomas@choppies.co.na'),
('Choppies Value Gift','Erf 10540, Clemence Kapuuo st, Katatura','264814000002','gift@choppies.co.na'),
('Choppies Value Donkerhoek','Erf 5988, Titus Namueja st, Katatura','264814000003','donkerhoek@choppies.co.na'),
('Choppies Etemba','Erf 4375, Dr Libertine Amathila and Tuin road, Town Square, Otjiwarongo','264813000000','etemba@choppies.co.na'),
('Choppies Okakarara','Shop 4, Ndjupaa Business Centre, Erf 1136, John Tjikuua st, Okararara','264816000000','okakarara@choppies.co.na'),
('Choppies Nkurenkuru','Erf No 551, Nkurenkuru','264819000001','nkurenkuru@choppies.co.na'),
('Choppies Divundu','Shop 1, Divundu Mall, B8, Divundu','264817000000','divundu@choppies.co.na'),
('Choppies Rundu','Cola Cola Building, Erf 1242, Ext 3, Rundu','264813000001','rundu@choppies.co.na'),
('Choppies Katima','Erf 581, Hage Geingob Street, Katima Mulilo','264814000004','katima@choppies.co.na'),
('Choppies Centre Katima','Erf 3883, Hage geingob st, Katima','264817000001','katimacentre@choppies.co.na'),
('Choppies Khorixas','Shop No:23, Erf 4255, Ext.1, Khorixas','264814000005','khorixas@choppies.co.na'),
('Choppies Mondesa','Funky Inn, Erf 4079, Mandume Ya Ndemufayo st, Mondesa','264819000002','mondesa@choppies.co.na'),
('Choppies Walvisbay','Shop No:5, Erf 850, Cnr Hage Geingob Street & 12th Road, Walvisbay','264814000006','walvisbay@choppies.co.na'),
('Choppies Kuisebmund','Erf 2978, Breemond street, Kuisebmund, Walvis','264819000003','kuisebmund@choppies.co.na'),
('Choppies Outapi','Erf 682, D 3612 Road, Outapi','264819000004','outapi@choppies.co.na'),
('Choppies Ondangwa','Unit B, Bank Windhoek Building, Erf 1229, Main Street, Ondangwa','264813000002','ondangwa@choppies.co.na'),
('Choppies Ongwediva','Shop No:7, Erf 4992, Mandumo Nddemefayo Avenue, Ongwediva','264813000003','ongwediva@choppies.co.na'),
('Choppies Santorini','Erf 1612, C46, Oshakati (next to Total Santorini)','264815000001','santorini@choppies.co.na'),
('Choppies Etango Mall','Unit 6, Etango Shopping Mall, Erf 3871, Ext 4, Oshakati','264815000002','etango@choppies.co.na')
ON CONFLICT (name) DO NOTHING;

-- ======================
-- SEED USERS
-- ======================
-- Example only, replace or extend as needed
INSERT INTO users (shop_id, role_id, email, password)
SELECT s.id, r.id, u.email, 'password123'
FROM (
  VALUES
    ('Choppies Omuthiya','manager.omuthiya@choppies.co.na','Manager'),
    ('Choppies Omuthiya','admin.omuthiya@choppies.co.na','Admin'),
    ('Choppies Omuthiya','cashier.omuthiya@choppies.co.na','Cashier'),
    ('Choppies Rosh Pinah','manager.pinah@choppies.co.na','Manager'),
    ('Choppies Rosh Pinah','admin.pinah@choppies.co.na','Admin'),
    ('Choppies Rosh Pinah','cashier.pinah@choppies.co.na','Cashier'),
    ('Choppies Delhi','manager.delhi@choppies.co.na','Manager'),
    ('Choppies Delhi','admin.delhi@choppies.co.na','Admin'),
    ('Choppies Delhi','cashier.delhi@choppies.co.na','Cashier')
) AS u(shop_name,email,role_name)
JOIN shops s ON s.name = u.shop_name
JOIN roles r ON r.name = u.role_name
ON CONFLICT DO NOTHING;

-- ======================
-- SEED CATEGORIES
-- ======================
INSERT INTO categories (name) VALUES
('Bread and Cereals'),
('Meat'),
('Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'),
('Milk, Cheese, and Eggs'),
('Vegetables'),
('Biltong'),
('Mahangu (Millet)'),
('Seafood'),
('Fish-Based Products')
ON CONFLICT (name) DO NOTHING;

-- ======================
-- SEED PRODUCTS WITH EXPIRATION & DAMAGE
-- ======================
INSERT INTO products (product_id, name, category_id, expiration_days, damage_status)
VALUES
-- Bread and Cereals
('P0001', 'White Bread', (SELECT id FROM categories WHERE name='Bread and Cereals'), 7, NULL),
('P0002', 'Wholegrain Bread', (SELECT id FROM categories WHERE name='Bread and Cereals'), 7, NULL),
('P0003', 'Rye Bread', (SELECT id FROM categories WHERE name='Bread and Cereals'), 7, NULL),
('P0004', 'Oats (Rolled, Steel-cut, Instant)', (SELECT id FROM categories WHERE name='Bread and Cereals'), 730, NULL),
('P0005', 'Rice (White, Brown, Basmati, Jasmine)', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0006', 'Maize/Cornmeal', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0007', 'Wheat Flour', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0008', 'Cornflakes', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0009', 'Oatmeal', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0010', 'Puffed Rice', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0011', 'Barley', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0012', 'Quinoa', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0013', 'Millet (including Mahangu)', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0014', 'Muesli', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0015', 'Breakfast Cereals', (SELECT id FROM categories WHERE name='Bread and Cereals'), 365, NULL),
('P0016', 'Pasta (Spaghetti, Penne, Macaroni)', (SELECT id FROM categories WHERE name='Bread and Cereals'), 730, NULL),
-- Meat
('P0017', 'Beef (Fresh, Processed)', (SELECT id FROM categories WHERE name='Meat'), 3, 'Fresh'),
('P0018', 'Pork', (SELECT id FROM categories WHERE name='Meat'), 3, 'Fresh'),
('P0019', 'Chicken', (SELECT id FROM categories WHERE name='Meat'), 3, 'Fresh'),
('P0020', 'Duck', (SELECT id FROM categories WHERE name='Meat'), 3, 'Fresh'),
('P0021', 'Lamb', (SELECT id FROM categories WHERE name='Meat'), 3, 'Fresh'),
('P0022', 'Game Meat (Venison, etc.)', (SELECT id FROM categories WHERE name='Meat'), 3, 'Fresh'),
('P0023', 'Sausages', (SELECT id FROM categories WHERE name='Meat'), 14, 'Refrigerated'),
('P0024', 'Deli Meats', (SELECT id FROM categories WHERE name='Meat'), 14, 'Refrigerated'),
('P0025', 'Bacon', (SELECT id FROM categories WHERE name='Meat'), 14, 'Refrigerated'),
('P0026', 'Ham', (SELECT id FROM categories WHERE name='Meat'), 14, 'Refrigerated'),
('P0027', 'Liver', (SELECT id FROM categories WHERE name='Meat'), 2, 'Refrigerated'),
('P0028', 'Meat Offal', (SELECT id FROM categories WHERE name='Meat'), 2, 'Refrigerated'),
('P0029', 'Jerky', (SELECT id FROM categories WHERE name='Meat'), 365, 'Unopened'),
('P0030', 'Meat Alternatives (Tofu, Tempeh, Seitan)', (SELECT id FROM categories WHERE name='Meat'), 180, 'Refrigerated'),
-- Sugar, Jam, Honey, etc.
('P0031', 'Granulated Sugar', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), NULL, NULL),
('P0032', 'Brown Sugar', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), NULL, NULL),
('P0033', 'Powdered Sugar', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), NULL, NULL),
('P0034', 'Jams and Preserves (Strawberry, Apple, Mixed Fruit)', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, 'Unopened'),
('P0035', 'Honey (Raw, Processed)', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, 'Unopened'),
('P0036', 'Maple Syrup', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, 'Unopened'),
('P0037', 'Agave Nectar', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, 'Unopened'),
('P0038', 'Chocolate Bars', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0039', 'Cocoa Powder', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0040', 'Caramel', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0041', 'Candies (Hard, Soft)', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0042', 'Lollipops', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0043', 'Gum', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0044', 'Toffees', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0045', 'Marshmallows', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
('P0046', 'Confectionery Chocolates', (SELECT id FROM categories WHERE name='Sugar, Jam, Honey, Syrups, Chocolate, and Confectionery'), 365, NULL),
-- Dairy & Eggs
('P0047', 'Fresh Milk (Cow, Goat, Plant-Based Alternatives)', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 7, 'Refrigerated'),
('P0048', 'UHT Milk', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 270, 'Unopened'),
('P0049', 'Yogurt (Plain, Flavored)', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 21, 'Refrigerated'),
('P0050', 'Cheese (Cheddar, Mozzarella, Parmesan, Cream Cheese, Blue Cheese)', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 28, 'Refrigerated'),
('P0051', 'Butter', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 90, 'Refrigerated'),
('P0052', 'Cream', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 7, 'Refrigerated'),
('P0053', 'Whey Protein', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), NULL, NULL),
('P0054', 'Eggs (Chicken, Duck, Quail)', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 35, 'Refrigerated'),
('P0055', 'Egg Substitutes', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 180, 'Refrigerated'),
('P0056', 'Custard', (SELECT id FROM categories WHERE name='Milk, Cheese, and Eggs'), 14, 'Refrigerated'),
-- Vegetables
('P0057', 'Leafy Greens (Spinach, Lettuce, Kale)', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Fresh'),
('P0058', 'Root Vegetables (Carrots, Beets, Turnips)', (SELECT id FROM categories WHERE name='Vegetables'), 90, 'Cool, Dark Place'),
('P0059', 'Tubers (Potatoes, Sweet Potatoes)', (SELECT id FROM categories WHERE name='Vegetables'), 90, 'Cool, Dark Place'),
('P0060', 'Tomatoes', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0061', 'Onions', (SELECT id FROM categories WHERE name='Vegetables'), 30, 'Cool, Dark Place'),
('P0062', 'Bell Peppers', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0063', 'Cucumbers', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0064', 'Zucchini', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0065', 'Broccoli', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0066', 'Cauliflower', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0067', 'Cabbage', (SELECT id FROM categories WHERE name='Vegetables'), 30, 'Cool, Dark Place'),
('P0068', 'Peas', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0069', 'Green Beans', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0070', 'Eggplant', (SELECT id FROM categories WHERE name='Vegetables'), 7, 'Refrigerated'),
('P0071', 'Mushrooms', (SELECT id FROM categories WHERE name='Vegetables'), 5, 'Refrigerated'),
('P0072', 'Asparagus', (SELECT id FROM categories WHERE name='Vegetables'), 3, 'Refrigerated'),
('P0073', 'Garlic', (SELECT id FROM categories WHERE name='Vegetables'), 90, 'Cool, Dark Place'),
-- Biltong
('P0074', 'Beef Biltong', (SELECT id FROM categories WHERE name='Biltong'), 180, 'Dried'),
('P0075', 'Venison Biltong', (SELECT id FROM categories WHERE name='Biltong'), 180, 'Dried'),
('P0076', 'Chicken Biltong', (SELECT id FROM categories WHERE name='Biltong'), 180, 'Dried'),
('P0077', 'Fish Biltong (Dried Fish)', (SELECT id FROM categories WHERE name='Biltong'), 180, 'Dried'),
-- Millet
('P0078', 'Pearl Millet', (SELECT id FROM categories WHERE name='Mahangu (Millet)'), 365, 'Dry Storage'),
('P0079', 'Finger Millet', (SELECT id FROM categories WHERE name='Mahangu (Millet)'), 365, 'Dry Storage'),
('P0080', 'Foxtail Millet', (SELECT id FROM categories WHERE name='Mahangu (Millet)'), 365, 'Dry Storage'),
('P0081', 'Proso Millet', (SELECT id FROM categories WHERE name='Mahangu (Millet)'), 365, 'Dry Storage'),
-- Seafood
('P0082', 'Shrimp', (SELECT id FROM categories WHERE name='Seafood'), 2, 'Refrigerated'),
('P0083', 'Crab', (SELECT id FROM categories WHERE name='Seafood'), 2, 'Refrigerated'),
('P0084', 'Lobster', (SELECT id FROM categories WHERE name='Seafood'), 2, 'Refrigerated'),
('P0085', 'Clams', (SELECT id FROM categories WHERE name='Seafood'), 2, 'Refrigerated'),
('P0086', 'Mussels', (SELECT id FROM categories WHERE name='Seafood'), 2, 'Refrigerated'),
('P0087', 'Squid', (SELECT id FROM categories WHERE name='Seafood'), 2, 'Refrigerated'),
('P0088', 'Octopus', (SELECT id FROM categories WHERE name='Seafood'), 2, 'Refrigerated'),
('P0089', 'Seaweed', (SELECT id FROM categories WHERE name='Seafood'), 7, 'Refrigerated'),
-- Fish-Based Products
('P0090', 'Canned Fish (Tuna, Sardines, Mackerel)', (SELECT id FROM categories WHERE name='Fish-Based Products'), 1825, 'Unopened'),
('P0091', 'Smoked Fish', (SELECT id FROM categories WHERE name='Fish-Based Products'), 180, 'Refrigerated'),
('P0092', 'Canned Fish', (SELECT id FROM categories WHERE name='Fish-Based Products'), 1825, 'Unopened'),
('P0093', 'Fish Fillets', (SELECT id FROM categories WHERE name='Fish-Based Products'), 180, 'Refrigerated'),
('P0094', 'Fish Sausages', (SELECT id FROM categories WHERE name='Fish-Based Products'), 180, 'Refrigerated'),
('P0095', 'Fish Balls', (SELECT id FROM categories WHERE name='Fish-Based Products'), 180, 'Refrigerated'),
('P0096', 'Fish Oil', (SELECT id FROM categories WHERE name='Fish-Based Products'), 730, 'Unopened'),
('P0097', 'Fish Paste (Surimi)', (SELECT id FROM categories WHERE name='Fish-Based Products'), 730, 'Unopened'),
('P0098', 'Fish Snacks', (SELECT id FROM categories WHERE name='Fish-Based Products'), 180, 'Refrigerated');