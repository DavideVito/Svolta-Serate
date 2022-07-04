import React, { Suspense } from "react"
import Loading from "../Loading"


interface SuspenseWrapperProps {
    children: React.ReactNode,
    text?: string
}
const SuspenseWrapper = ({ children, text }: SuspenseWrapperProps) => <Suspense fallback={<Loading text={text} />}>{children}</Suspense>

export default SuspenseWrapper