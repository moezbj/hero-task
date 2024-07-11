export enum ROLE {
  ALL = '*',
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  CLIENT = 'CLIENT'
  // COLLABORATOR = 'COLLABORATOR'
}

const privileges: { [K in ROLE]?: ROLE[] } = {
  [ROLE.ALL]: Object.values(ROLE) as ROLE[]
  // [ROLE.COMPANY]: [ROLE.COLLABORATOR]
}

function isValidROLE(role: ROLE, user?: { role: string }): boolean {
  return role === user?.role || Boolean(privileges[role]?.find((r) => r === user?.role))
}

export function isUserAuthenticated(user?: { role: string }, role: ROLE[] = []): boolean {
  if (!user && role.length) return false
  if (role.length && !role.find((r) => isValidROLE(r, user))) return false
  return true
}
