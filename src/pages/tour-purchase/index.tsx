import React, { useState } from "react";
import Meta from "@/components/Layout/meta";
import db from "@/utils/database";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Stepper, StepLabel, Step, Button } from "@mui/material";
import { user } from "@/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { tourPurchaseProps, pageNotFound } from "@/utils/types";
import { steps } from "@/utils/data";
import { ConfirmInfo } from "@/components";
import { useRouter } from "next/router";
const MakePayment = dynamic(() => import("@/components/MakePayMent"));

const TourPurchase = (props: tourPurchaseProps) => {
  const { userData } = props;

  const [paymentStep, setPaymentStep] = useState<number>(0);

  const router = useRouter()

  const goToHistory = () => {
    router.push('/history');
  }

  return (
    <div className="bg-slate-200 flex justify-center">
      <Meta
        props={{
          title: "Xplore | Purchase",
          robots: "none",
        }}
      />
      <div className="container mt-[100px] mb-8">
        <div className="h-[80vh] min-h-[560px] border-2 rounded-lg border-blue-600 py-8 px-16">
          <div className="mb-8">
            <Stepper activeStep={paymentStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          {paymentStep === 0 && (
            <ConfirmInfo userData={userData} setPaymentStep={setPaymentStep} />
          )}
          {paymentStep === 1 && (
            <MakePayment userData={userData} setPaymentStep={setPaymentStep} />
          )}
          {paymentStep === 2 && (
            <div
              className="flex flex-col justify-center items-center"
              style={{ animation: "fadeIn .3s ease-in" }}
            >
              <Image
                src={require("@/assets/images/Icon/tick.svg")}
                alt="tick"
                height={80}
                width={80}
              />
              <p className="text-2xl font-semibold text-lime-600">
                Purchase successfully!
              </p>
              <Button sx={{ marginTop: "18px" }} variant="contained" onClick={goToHistory}>
                Check history
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourPurchase;

export const getServerSideProps: GetServerSideProps<
  tourPurchaseProps | pageNotFound
> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  try {
    await db();
    const userData = await user.findOne(
      { email: session?.user?.email },
      "email tel fullName"
    );
    return {
      props: {
        userData: JSON.parse(JSON.stringify(userData)),
      },
    };
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
