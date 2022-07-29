import { LinearProgress } from "@mui/material"
import React, { Suspense } from "react"
import Loading from "../Loading"


interface SuspenseWrapperProps {
    children: React.ReactNode,
    loadingCompoent?: React.ReactNode
    text?: string
}
const SuspenseWrapper = ({ children, text, loadingCompoent = <LinearProgress /> }: SuspenseWrapperProps) => <Suspense fallback={<Loading text={text} component={loadingCompoent} />} >{children}</Suspense>

export default SuspenseWrapper