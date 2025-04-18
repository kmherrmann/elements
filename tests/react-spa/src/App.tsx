import React, { useEffect, useState } from "react"
import "./App.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Login } from "./Login"
import { Registration } from "./Registration"
import { Verification } from "./Verification"
import { Session } from "@ory/client"
import sdk from "./sdk"
import { Typography } from "@ory/elements"
import { Recovery } from "./Recovery"
import { Settings } from "./Settings"

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [logoutUrl, setLogoutUrl] = useState<string>()

  const navigate = useNavigate()

  useEffect(() => {
    sdk
      .toSession()
      .then(({ data: session }) => {
        setSession(session)
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          if (error.response?.data.error.id === "session_aal2_required") {
            return navigate("/login?aal2=true", { replace: true })
          }
        }
        return navigate("/login", { replace: true })
      })
  }, [])

  useEffect(() => {
    sdk
      .createSelfServiceLogoutFlowUrlForBrowsers(undefined, {
        params: {
          return_url: "/",
        },
      })
      .then(({ data }) => {
        setLogoutUrl(data.logout_url)
      })
      .catch((data) => {
        console.error(data)
      })
  }, [])

  return (
    <>
      <Typography size={"headline37"}>Welcome to the dashboard!</Typography>
      <Typography size={"headline21"}>
        {session?.identity.traits.firstName} you can logout here:{" "}
        <a href={logoutUrl}>Logout</a> or go to your settings page here:{" "}
        <a href="/settings">Settings</a>
      </Typography>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App
