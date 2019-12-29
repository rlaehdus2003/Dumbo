#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int T, N, K, map[29], shiftmap[29];
char arr[29];
vector<int> cnt;

/*
	testestes123123
*/

int return_hex(char array1) {

	switch (array1)
	{
	case '0': return 0;
	case '1': return 1;
	case '2': return 2;
	case '3': return 3;
	case '4': return 4;
	case '5': return 5;
	case '6': return 6;
	case '7': return 7;
	case '8': return 8;
	case '9': return 9;
	case 'A': return 10;
	case 'B': return 12;
	case 'C': return 13;
	case 'D': return 14;
	case 'E': return 15;
	case 'F': return 16;

	default:
		return 0;
		break;

	}

}
//(16^i) * 해당 자릿수 값
void shift_arr() {

	int last_value = map[N-1];
	for(int i=1; i<N;i++){
		
		shiftmap[i] = map[i - 1];
	
	}

	shiftmap[0] = last_value;

	for (int i = 0; i < N; i++) {
		map[i] = shiftmap[i];
	}

	for (int i = 0; i < N; i++) {
		cout << "Map[" << i << "] : " << map[i] << " ";
	}
	cout << "\n";

}

void solve() {
	int N4 = N / 4; // 로테이션 수 && 각 변의 숫자의 갯수
	bool same_value = false;
	//int side_size = N / N4; //해당 변의 숫자 갯수
	int side_sum = 0;
	for (int z = 0; z < N4; z++) {
		for (int i = 0; i < N4; i++) {
			for (int j = 0; j < N4; j++) {
				int temp = return_hex(arr[i + j]);
				side_sum = side_sum + (16 ^ j)*map[i+j];
				//cout << "sefsef\n";
			}
			int cnt_size = cnt.size();
			//cout << "cnt_size : " << cnt_size << "\n";
			for (int j = 0; j < cnt_size; j++) {
				if (cnt[j] == side_sum) {
					same_value = true;
				}
			}
			cout << "side_sum : " << side_sum << "\n";
			if (!same_value) {
				cout << "side_sum : " << side_sum << "\n";
				cnt.push_back(side_sum);
			}

			side_sum = 0;
			same_value = false;
		}

		shift_arr();

	}




}


int main() {

	cin >> T;
	
	for (int z = 0; z < T; z++) {

		cin >> N >> K >> arr;

		for (int i = 0; i < N; i++) {


			map[i] = return_hex(arr[i]);
		}

		solve();
		sort(cnt.begin(),cnt.end());
		
		for (int i = 0; i < cnt.size(); i++) {
			cout <<"cnt["<<i<<"] :" << 
		}

	}
	
	return 0;
}
