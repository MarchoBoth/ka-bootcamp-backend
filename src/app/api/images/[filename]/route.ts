import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  request: Request,
  { params }: { params: { filename: string } },
) {
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .remove([params.filename]);
    if (error) {
      throw new Error(`Failed to delete ${params.filename}: ${error.message}`);
    }
    console.log(data);
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
