import React from "react"
import { SelfServiceVerificationFlow } from "@ory/client"
import { useEffect, useState } from "react"
import { UserAuthCard } from "@ory/elements"
import sdk from "./sdk"

export const Verification = (): JSX.Element => {
  const [flow, setFlow] = useState<SelfServiceVerificationFlow | null>(null)

  useEffect(() => {
    sdk
      .initializeSelfServiceVerificationFlowForBrowsers()
      .then(({ data: flow }) => {
        setFlow(flow)
      })
      .catch((error) => console.error(error))
  }, [])

  return flow ? (
    <UserAuthCard
      flow={flow}
      flowType={"verification"}
      additionalProps={{
        loginURL: "/login",
      }}
      title="Verification"
    />
  ) : (
    <div>Loading...</div>
  )
}
