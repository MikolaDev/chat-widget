enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
}

const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/mobile|iphone|ipod|android|blackberry|windows phone/i.test(userAgent)) {
    return DeviceType.MOBILE
  } else if (/tablet|ipad|kindle|playbook/i.test(userAgent)) {
    return DeviceType.TABLET
  } else {
    return DeviceType.DESKTOP
  }
}

export const isMobile = () => getDeviceType() === DeviceType.MOBILE
export const isTablet = () => getDeviceType() === DeviceType.TABLET
export const isDesktop = () => getDeviceType() === DeviceType.DESKTOP
