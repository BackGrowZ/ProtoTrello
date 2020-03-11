Rails.application.routes.draw do
  scope '/api/v1' do
    post 'user_token' => 'user_token#create'
    resources :users
  end

  scope '/api/v1' do
    post 'user_token' => 'user_token#create'
    resources :boards
  end

  scope '/api/v1' do
    post 'user_token' => 'user_token#create'
    resources :listes
  end

  scope '/api/v1' do
    post 'user_token' => 'user_token#create'
    resources :cards
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end