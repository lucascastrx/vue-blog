export const periods = ['Today', 'This week', 'This month'] as const

export type Period = typeof periods[number]
