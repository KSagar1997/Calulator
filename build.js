//listener for submit
document.getElementById('loan-form').addEventListener('submit',function(event){
  // value = null Hide results
  document.getElementById('results').style.display='none';

  //value = block show loader
  document.getElementById('loading').style.display='block';

  // set the time for calculate result
  setTimeout(calculatedResult,3000);
  
  event.preventDefault();
});

//calculate result function
function calculatedResult(event){
  console.log('Calculating..');
  //UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  
  //Comute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x* calculatedInterest)/(x-1);      //monthly payment

  if(isFinite(monthly)) {
    //show results
  document.getElementById('results').style.display='block';

  //hide loader
  document.getElementById('loading').style.display='none';
  setTimeout(calculatedResult,3000);
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
  }else{
    // console.log('Please check a No.');
    showError('Please check your nunmbers');
  }

  event.preventDefault();
}
// //show error
function showError(error){
  //Hide results
  document.getElementById('results').style.display='none';

  //hide loader
  document.getElementById('loading').style.display='none';
  
  //create a div
  const errorDiv=document.createElement('div');

  //get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className='alert alert-danger';

  //create text node and appened to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv,heading);

  //clear error after 3 second
  setTimeout(clearError,3000); //mili Second
}

//clear Error
function clearError(){
  document.querySelector('.alert').remove();
}
