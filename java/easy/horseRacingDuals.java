import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Solution {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int N = in.nextInt();
        int[] forces= new int[N];
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < N; i++) {
            int pi = in.nextInt();
            map.put(i, pi);
            forces[i]=pi;
        }
        Arrays.sort(forces);
        int[] closest =new int[forces.length-1];
        for(int x=0; x<forces.length-1; x++){
            closest[x]= forces[x+1] -forces[x];
        }
        Arrays.sort(closest);
        int min =closest[0];
        // Write an answer using System.out.println()
        // To debug: System.err.println("Debug messages...");

        System.out.println(min);
    }
}