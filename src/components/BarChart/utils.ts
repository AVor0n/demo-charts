export function getTicks(times: number[], gridStepX: number) {
  if (gridStepX === 1) return times;

  const ticks: number[] = [];
  times.forEach((it, idx) => {
    if (!(idx % gridStepX)) ticks.push(it)
  })
  return ticks
}