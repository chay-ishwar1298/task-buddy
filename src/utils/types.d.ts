import React from 'react'
import { ThemeOptions } from '@mui/material'
import { TableColumnProps } from '../custom_components/CustomTableHeader'

type SetterFunction<T> = React.Dispatch<React.SetStateAction<T>>
export interface TypographyOptions {
	[key: string]: ThemeOptions
}

export interface PaletteOptions {
	[key: string]: ThemeOptions
}

export type sortKeyProps = { key: string; value: number }

export type SetTableColumnProps = React.Dispatch<React.SetStateAction<TableColumnProps[]>>

export type SetStateSortKeys = React.Dispatch<React.SetStateAction<sortKeyProps[]>>

type EmptyFunction = () => void
