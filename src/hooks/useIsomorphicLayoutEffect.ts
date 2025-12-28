'use client'

import { useEffect, useLayoutEffect } from 'react'

/**
 * useIsomorphicLayoutEffect
 *
 * Uses useLayoutEffect on the client (for synchronous DOM measurements)
 * and useEffect on the server (to avoid SSR warnings).
 *
 * This is the standard pattern for Next.js/SSR compatibility.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
