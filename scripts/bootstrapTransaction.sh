set -x
composer transaction submit  -n subrogation-network -p hlfv1 -i PeerAdmin -s adminpw -d "{\"\$class\": \"org.example.subrogation.Bootstrap\"}"
