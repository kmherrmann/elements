import { SelfServiceVerificationFlow } from "@ory/client"
import { UserAuthCard } from "@ory/elements-preact"
import { useEffect, useState } from "preact/hooks"
import sdk from "./sdk"

export const Verification = () => {
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
