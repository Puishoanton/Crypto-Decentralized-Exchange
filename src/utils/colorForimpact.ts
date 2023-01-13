export const colorForImpact = (impactCalc1: string, impactCalc2: string) => {
  if ((+impactCalc1 || +impactCalc2) < 0.2) {
    return 'impact-green'
  } else if ((+impactCalc1 || +impactCalc2) < 0.5) {
    return 'impact-yellow'
  } else if ((+impactCalc1 || +impactCalc2) > 0.5) {
    return 'impact-red'
  }
}
