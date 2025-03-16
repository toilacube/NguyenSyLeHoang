// The problem not mention the negative number, so we assume that we should handle the negative number as well.


// O(1) - most efficient
function sum_to_n_a(n: number): number {
    if (n >= 0) {
        return (n * (n + 1)) / 2;
    } else {
        return (-(n * (n - 1)) / 2); 
    }
}

// O(n)
function sum_to_n_b(n: number): number {
    let sum = 0;
    if (n > 0) {
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
    } else {
        for (let i = n; i <= -1; i++) {
            sum += i;
        }
    }
    return sum;
}

// O(n) for both time and space complexity so this is not efficient
function sum_to_n_c(n: number): number {
  if (n === 0) return 0;
  return n + sum_to_n_c(n > 0 ? n - 1 : n + 1);
}
