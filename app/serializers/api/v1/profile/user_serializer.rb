class Api::V1::Profile::UserSerializer < Api::V1::UserSerializer
	has_many :following, serializer: Api::V1::Profile::UserItemSerializer, scope: -> {scope}
	has_many :followers, serializer: Api::V1::Profile::UserItemSerializer, scope: -> {scope}
end