/* This example requires Tailwind CSS v2.0+ */

import { ExclamationIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { sendAccountVerificationTokenAction } from "../../../redux/slices/accountVerification/accVerificationTokenSlices";

export default function AccountVerificationAlertWarning() {
  //dispatch 
  const dispatch = useDispatch();
  return (
    <div className="bg-red-500 border-l-4 border-yellow-400 p-1">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-200">
            Your account is not verified.{" "}
            <button onClick={()=>dispatch(sendAccountVerificationTokenAction())} className="font-medium underline text-green-200 hover:text-yellow-600">
              Click this link to verify
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
