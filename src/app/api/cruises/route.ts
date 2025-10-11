import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { CruiseType } from '@/clients/cruises/cruises';
import { 
  CruisesListResponse, 
  ErrorResponse, 
  CruiseWithCompanyAndAssets 
} from './models';

export async function GET(
  request: NextRequest
): Promise<NextResponse<CruisesListResponse | ErrorResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') as CruiseType;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '3');
    
    // Validate cruise type
    const validTypes: CruiseType[] = ['relax', 'destination', 'adventure', 'bucketlist'];
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid cruise type. Must be one of: relax, destination, adventure, bucketlist' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    const offset = (page - 1) * limit;
    
    // Get total count for the cruise type
    const { count } = await supabase
      .from('cruises')
      .select('*', { count: 'exact', head: true })
      .like('type', `%${type}%`);
    
    // Get paginated cruises with company and assets
    const { data: cruises, error } = await supabase
      .from('cruises')
      .select(`
        *,
        cruise_companies (
          id,
          name,
          description,
          logo_url
        ),
        cruise_assets (
          id,
          url,
          short_description,
          type
        )
      `)
      .like('type', `%${type}%`)
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: `Failed to fetch cruises: ${error.message}` },
        { status: 500 }
      );
    }
    
    const total = count || 0;
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      cruises: (cruises as CruiseWithCompanyAndAssets[]) || [],
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

