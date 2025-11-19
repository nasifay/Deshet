import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Product from '~/lib/db/models/Product';
import { getSession } from '~/lib/auth/session';

// GET - List all products with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || '-createdAt';

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      name,
      nameAm,
      nameEn,
      slug,
      description,
      descriptionAm,
      descriptionEn,
      ingredients,
      ingredientsAm,
      ingredientsEn,
      usageInstructions,
      usageInstructionsAm,
      usageInstructionsEn,
      benefits,
      benefitsAm,
      benefitsEn,
      safetyNotes,
      safetyNotesAm,
      safetyNotesEn,
      images,
      price,
      category,
      isActive,
      status,
      order,
    } = body;

    // Validation
    if (!name || !slug || !description || !ingredients || !usageInstructions || !benefits || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Create product
    const product = await Product.create({
      name,
      nameAm,
      nameEn,
      slug: slug.toLowerCase().trim(),
      description,
      descriptionAm,
      descriptionEn,
      ingredients,
      ingredientsAm,
      ingredientsEn,
      usageInstructions,
      usageInstructionsAm,
      usageInstructionsEn,
      benefits,
      benefitsAm,
      benefitsEn,
      safetyNotes,
      safetyNotesAm,
      safetyNotesEn,
      images: images || [],
      price: price || undefined,
      category,
      isActive: isActive !== undefined ? isActive : true,
      status: status || 'draft',
      order: order || 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}



