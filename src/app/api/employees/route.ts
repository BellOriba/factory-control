import { NextRequest, NextResponse } from "next/server";
import { CommonRequest } from "@/types/common.types";
import employeeService from "@/services/employee-service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = { ...body };

  return NextResponse.json(await employeeService.createEmployee(data));
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const page = params.get("page");
  const perPage = params.get("perPage");

  const filters = {
    page: page ? Number(page) : 1,
    perPage: perPage ? Number(perPage) : 10
  } as CommonRequest;

  return NextResponse.json(await employeeService.getAllEmployees(filters));
}
