//chatgpt code, not mine
function seededRandom(seed) {
    // Simple deterministic "random" function based on a seed
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function introduceErrors(str, errorLevel) {
    // Step 1: Determine the number of errors to introduce
    const errorsFull = Math.floor(errorLevel);
    const partialErrorChance = errorLevel - errorsFull;  // Fractional part as a chance for an additional error
    let result = str.split('');
    const seed = str.length + errorLevel; // Use string length + error level as the seed

    const possibleErrors = ['delete', 'add', 'swap'];

    // Helper function to apply a specific error
    function applyError(type, index, seed) {
        switch (type) {
            case 'delete':
                if (result.length > 1) result.splice(index, 1); // Remove one character if possible
                break;
            case 'add':
                const randomChar = String.fromCharCode(Math.floor(seededRandom(seed) * 26) + 97); // Random lowercase letter
                result.splice(index, 0, randomChar); // Add at random position
                break;
            case 'swap':
                if (index < result.length - 1) {
                    // Swap two adjacent characters
                    [result[index], result[index + 1]] = [result[index + 1], result[index]];
                }
                break;
        }
    }

    // Step 2: Apply full errors
    let addCount = 0;  // Track how many additions we make
    let deleteCount = 0; // Track how many deletions we make

    for (let i = 0; i < errorsFull; i++) {
        const randomIndex = Math.floor(seededRandom(seed + i) * result.length);
        const errorType = possibleErrors[Math.floor(seededRandom(seed + i + 100) * possibleErrors.length)];

        // Ensure that deletions and additions are balanced
        if (errorType === 'delete' && deleteCount < addCount) {
            deleteCount++;
        } else if (errorType === 'add' && addCount < deleteCount) {
            addCount++;
        }

        applyError(errorType, randomIndex, seed + i);
    }

    // Step 3: Apply partial error with some probability
    if (seededRandom(seed + 1000) < partialErrorChance) {
        const randomIndex = Math.floor(seededRandom(seed + errorsFull) * result.length);
        const errorType = possibleErrors[Math.floor(seededRandom(seed + errorsFull + 100) * possibleErrors.length)];

        // Ensure that deletions and additions remain balanced during the partial error
        if (errorType === 'delete' && deleteCount < addCount) {
            applyError(errorType, randomIndex, seed + errorsFull);
            deleteCount++;
        } else if (errorType === 'add' && addCount <= deleteCount) {
            applyError(errorType, randomIndex, seed + errorsFull);
            addCount++;
        } else if (errorType === 'swap') {
            applyError(errorType, randomIndex, seed + errorsFull);
        }
    }

    // Step 4: Adjust the string length to ensure it remains close to the original
    // If the length got too long due to excessive adds, or too short due to deletions, we fix it here
    while (result.length > str.length) {
        // Remove random excess characters
        const randomIndex = Math.floor(seededRandom(seed + result.length) * result.length);
        result.splice(randomIndex, 1);
    }

    while (result.length < str.length) {
        // Add random characters to restore the original length
        const randomChar = String.fromCharCode(Math.floor(seededRandom(seed + result.length) * 26) + 97);
        const randomIndex = Math.floor(seededRandom(seed + randomChar.charCodeAt(0)) * result.length);
        result.splice(randomIndex, 0, randomChar);
    }

    return result.join('');
}

exports.handleAddErrors = (person, errorNumber) => {
    return {
        id: person.id,
        name: introduceErrors(person.name, errorNumber),
        address: introduceErrors(person.address, errorNumber),
        phone: introduceErrors(person.phone, errorNumber)
    };
};
