
import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";




export async function GET(req: NextRequest) {

  const session = await requireUser();

  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json({ message: "Hey we did not get the code" }, { status: 400 })
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code: code,

    });

    const { grantId, email } = response;

    await prisma.user.update({
      where: {
        id: session.user?.id
      },
      data: {
        grantId: grantId,
        grantEmail: email
      }

    })
  } catch (error) {
    return Response.json({ message: "something went wrong!", error }, { status: 400 })
  }

  redirect('/dashboard')
}